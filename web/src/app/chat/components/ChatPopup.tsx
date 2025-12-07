"use client";

import Modal from "@/refresh-components/Modal";
import SvgAlertCircle from "@/icons/alert-circle";
import { SettingsContext } from "@/components/settings/SettingsProvider";
import Button from "@/refresh-components/buttons/Button";
import { useContext, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { transformLinkUri } from "@/lib/utils";

const ALL_USERS_INITIAL_POPUP_FLOW_COMPLETED =
  "allUsersInitialPopupFlowCompleted";
export function ChatPopup() {
  const [completedFlow, setCompletedFlow] = useState(true);
  const [showConsentError, setShowConsentError] = useState(false);

  useEffect(() => {
    setCompletedFlow(
      localStorage.getItem(ALL_USERS_INITIAL_POPUP_FLOW_COMPLETED) === "true"
    );
  }, []);

  const settings = useContext(SettingsContext);
  const enterpriseSettings = settings?.enterpriseSettings;
  const isConsentScreen = enterpriseSettings?.enable_consent_screen;
  if (
    (!enterpriseSettings?.custom_popup_content && !isConsentScreen) ||
    completedFlow
  ) {
    return null;
  }

  const popupTitle =
    enterpriseSettings?.custom_popup_header ||
    (isConsentScreen
      ? "Conditions d'utilisation"
      : `Bienvenue sur ${enterpriseSettings?.application_name || "Dom Engin."}!`);

  const popupContent =
    enterpriseSettings?.custom_popup_content ||
    (isConsentScreen
      ? "En cliquant sur 'J'accepte', vous reconnaissez que vous acceptez les conditions d'utilisation de cette application et consentez à procéder."
      : "");

  return (
    <Modal open onOpenChange={() => {}}>
      <Modal.Content medium>
        <Modal.Header icon={SvgAlertCircle} title={popupTitle} />
        <Modal.Body>
          <div className="overflow-y-auto max-h-[60vh] text-left">
            <ReactMarkdown
              className="prose text-text-800 dark:text-neutral-100 max-w-full"
              components={{
                a: ({ node, ...props }) => (
                  <a
                    {...props}
                    className="text-link hover:text-link-hover"
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                ),
                p: ({ node, ...props }) => <p {...props} className="text-sm" />,
              }}
              remarkPlugins={[remarkGfm]}
              urlTransform={transformLinkUri}
            >
              {popupContent}
            </ReactMarkdown>
          </div>

          {showConsentError && (
            <p className="text-red-500 text-sm mt-2">
              Vous devez accepter les conditions d'utilisation pour accéder à l'application.
          </p>
        )}
</Modal.Body>
        <Modal.Footer className="p-4 flex w-full justify-center gap-4">
          {isConsentScreen && (
            <Button danger onClick={() => setShowConsentError(true)}>
              Annuler
            </Button>
          )}
          <Button
            onClick={() => {
              localStorage.setItem(
                ALL_USERS_INITIAL_POPUP_FLOW_COMPLETED,
                "true"
              );
              setCompletedFlow(true);
            }}
          >
            {isConsentScreen ? "J'accepte" : "Commencer!"}
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
