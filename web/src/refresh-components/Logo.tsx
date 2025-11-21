"use client";

import { useMemo } from "react";
import Image from "next/image";
import logoImage from "../../public/logo.png";
import { OnyxIcon, OnyxLogoTypeIcon } from "@/components/icons/icons";
import { useSettingsContext } from "@/components/settings/SettingsProvider";
import { cn } from "@/lib/utils";
import Text from "@/refresh-components/texts/Text";
import Truncated from "@/refresh-components/texts/Truncated";
import { LOGO_FOLDED_SIZE_PX, LOGO_UNFOLDED_SIZE_PX } from "@/lib/constants";

export interface LogoProps {
  folded?: boolean;
  size?: number;
  className?: string;
}

export default function Logo({ folded, size, className }: LogoProps) {
  const foldedSize = size ?? LOGO_FOLDED_SIZE_PX;
  const unfoldedSize = size ?? LOGO_UNFOLDED_SIZE_PX;
  const settings = useSettingsContext();
  const logoDisplayStyle = settings.enterpriseSettings?.logo_display_style;
  const applicationName = settings.enterpriseSettings?.application_name;

  const logo = useMemo(
    () =>
      true ? (
        <Image
          src={logoImage}
          alt="Logo"
          width={foldedSize}
          height={foldedSize}
          style={{
            objectFit: "contain",
          }}
          className={cn("flex-shrink-0", className)}
        />
      ) : (
        <Image
          src={logoImage}
          alt="Logo"
          width={foldedSize}
          height={foldedSize}
          style={{
            objectFit: "contain",
          }}
          className={cn("flex-shrink-0", className)}
        />
      ),
    [className, foldedSize, settings.enterpriseSettings?.use_custom_logo]
  );

  const renderNameAndPoweredBy = (opts: {
    includeLogo: boolean;
    includeName: boolean;
  }) => {
    return (
      <div className="flex flex-col min-w-0">
        <div className="flex flex-row items-center gap-2 min-w-0">
          {opts.includeLogo && logo}
          {opts.includeName && !folded && (
            <div className="flex-1 min-w-0">
              <Truncated headingH3>{applicationName || "Dom Engin."}</Truncated>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Handle "logo_only" display style
  if (logoDisplayStyle === "logo_only") {
    return renderNameAndPoweredBy({ includeLogo: true, includeName: false });
  }

  // Handle "name_only" display style
  if (logoDisplayStyle === "name_only") {
    return renderNameAndPoweredBy({ includeLogo: false, includeName: true });
  }

  // Handle "logo_and_name" or default behavior
  return applicationName || true ? (
    renderNameAndPoweredBy({ includeLogo: true, includeName: true })
  ) : folded ? (
    <Image
      alt="Logo"
      src="/logo.png"
      width={foldedSize}
      height={foldedSize}
      className={cn("flex-shrink-0", className)}
      style={{ objectFit: "contain" }}
    />
  ) : (
    <Image
      alt="Logo"
      src="/logo.png"
      width={unfoldedSize}
      height={unfoldedSize}
      className={className}
      style={{ objectFit: "contain" }}
    />
  );
}
