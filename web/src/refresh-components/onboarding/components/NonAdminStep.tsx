import React, { useRef, useState, useEffect } from "react";
import Text from "@/refresh-components/texts/Text";
import InputTypeIn from "@/refresh-components/inputs/InputTypeIn";
import Button from "@/refresh-components/buttons/Button";
import { updateUserPersonalization } from "@/lib/userSettings";
import { useUser } from "@/components/user/UserProvider";
import IconButton from "@/refresh-components/buttons/IconButton";
import InputAvatar from "@/refresh-components/inputs/InputAvatar";
import { cn } from "@/lib/utils";
import { SvgCheckCircle, SvgEdit, SvgUser, SvgX } from "@opal/icons";

export default function NonAdminStep() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { user, refreshUser } = useUser();
  const [name, setName] = useState("");
  const [showHeader, setShowHeader] = useState(false);
  const [isEditing, setIsEditing] = useState(true);
  const [savedName, setSavedName] = useState("");

  // Initialize name from user if available
  useEffect(() => {
    if (user?.personalization?.name && !savedName) {
      setSavedName(user.personalization.name);
      setIsEditing(false);
    }
  }, [user?.personalization?.name, savedName]);

  const containerClasses = cn(
    "flex items-center justify-between w-full max-w-[800px] p-3 bg-background-tint-00 rounded-16 border border-border-01 mb-4"
  );

  const handleSave = () => {
    updateUserPersonalization({ name })
      .then(() => {
        setSavedName(name);
        setShowHeader(true);
        setIsEditing(false);
        refreshUser();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div
        className="flex items-center justify-between w-full max-w-[800px] p-3 bg-background-tint-00 rounded-16 border border-border-01 mb-4"
        onClick={() => inputRef.current?.focus()}
        role="group"
      >
        <div className="flex items-center gap-1 h-full">
          <div className="h-full p-0.5">
            <SvgUser className="w-4 h-4 stroke-text-03" />
          </div>
          <div>
            <Text text04 mainUiAction>
              Quel nom devrait-on vous appeler ?
            </Text>
            <Text text03 secondaryBody>
              Nous afficherons ce nom dans l'application.
            </Text>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2">
          <InputTypeIn
            ref={inputRef}
            placeholder="Votre nom"
            value={name || ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            className="w-[26%] min-w-40"
          />
          <Button
            disabled={name === ""}
            onClick={() => {
              updateUserPersonalization({ name })
                .then(() => {
                  refreshUser();
                })
                .catch((error) => {
                  console.error(error);
                });
            }}
          >
            Sauvegarder
          </Button>
        </div>
      </div>
      {showHeader && (
        <div className="flex items-center justify-between w-full max-w-[800px] min-h-11 py-1 pl-3 pr-2 bg-background-tint-00 rounded-16 shadow-01 mb-2">
          <div className="flex items-center gap-1">
            <SvgCheckCircle className="w-4 h-4 stroke-status-success-05" />
            <Text as="p" text03 mainUiBody>
              Tout est prêt !
            </Text>
          </div>
          <IconButton
            internal
            icon={SvgX}
            onClick={() => setShowHeader(false)}
          />
        </div>
      )}
      {isEditing ? (
        <div
          className={containerClasses}
          onClick={() => inputRef.current?.focus()}
          role="group"
        >
          <div className="flex items-center gap-1 h-full">
            <div className="h-full p-0.5">
              <SvgUser className="w-4 h-4 stroke-text-03" />
            </div>
            <div>
              <Text as="p" text04 mainUiAction>
                Quel nom devrait-on vous appeler ?
              </Text>
              <Text as="p" text03 secondaryBody>
                Nous afficherons ce nom dans l'application.
              </Text>
            </div>
          </div>
          <div className="flex items-center justify-end gap-2">
            <InputTypeIn
              ref={inputRef}
              placeholder="Votre nom"
              value={name || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter" && name && name.trim().length > 0) {
                  e.preventDefault();
                  handleSave();
                }
              }}
              className="w-[26%] min-w-40"
            />
            <Button disabled={name === ""} onClick={handleSave}>
              Sauvegarder
            </Button>
          </div>
        </div>
      ) : (
        <div
          className={cn(containerClasses, "group")}
          aria-label="Edit display name"
          role="button"
          tabIndex={0}
          onClick={() => {
            setIsEditing(true);
            setName(savedName);
          }}
        >
          <div className="flex items-center gap-1">
            <InputAvatar
              className={cn(
                "flex items-center justify-center bg-background-neutral-inverted-00",
                "w-5 h-5"
              )}
            >
              <Text as="p" inverted secondaryBody>
                {savedName?.[0]?.toUpperCase()}
              </Text>
            </InputAvatar>
            <Text as="p" text04 mainUiAction>
              {savedName}
            </Text>
          </div>
          <div className="p-1 flex items-center gap-1">
            <IconButton
              internal
              icon={SvgEdit}
              tooltip="Edit"
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            />
            <SvgCheckCircle className="w-4 h-4 stroke-status-success-05" />
          </div>
        </div>
      )}
    </>
  );
}
