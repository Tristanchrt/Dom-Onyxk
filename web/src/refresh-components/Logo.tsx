"use client";

import { useMemo } from "react";
import Image from "next/image";
import logoImage from "../../public/logo.png";
import { OnyxIcon, OnyxLogoTypeIcon } from "@/components/icons/icons";
import { useSettingsContext } from "@/components/settings/SettingsProvider";
import { cn } from "@/lib/utils";
import Text from "@/refresh-components/texts/Text";
import { APPLICATION_TITLE, LOGO_FOLDED_SIZE_PX, LOGO_UNFOLDED_SIZE_PX } from "@/lib/constants";

export interface LogoProps {
  folded?: boolean;
  size?: number;
  className?: string;
}

export default function Logo({ folded, size, className }: LogoProps) {
  const foldedSize = size ?? LOGO_FOLDED_SIZE_PX;
  const unfoldedSize = size ?? LOGO_UNFOLDED_SIZE_PX;
  const settings = useSettingsContext();

  const isCustom = true;
  const logo = useMemo(
    () =>
      isCustom ? (
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
    [className, settings.enterpriseSettings?.use_custom_logo]
  );

  return isCustom ? (
    <div className="flex flex-col">
      <div className="flex flex-row items-center gap-2">
        <Text
          as="p"
          headingH3
          className={cn("line-clamp-1 truncate", folded && "hidden")}
          nowrap
        >
          {APPLICATION_TITLE}
        </Text>
      </div>
    </div>
  ) : folded ? (
    <OnyxIcon size={foldedSize} className={cn("flex-shrink-0", className)} />
  ) : (
    <OnyxLogoTypeIcon size={unfoldedSize} className={className} />
  );
}
