import { ExternalPathString, Link } from "expo-router";
import { openBrowserAsync } from "expo-web-browser";
import { ComponentProps } from "react";
import { Platform } from "react-native";


type Props = Omit<ComponentProps<typeof Link>, "href"> & { href: string };

export function ExternalLink({ href, onPress, ...rest }: Props) {
  return (
    <Link
      target="_blank"
      {...rest}
      href={href as ExternalPathString} // Cast href to ExternalPathString
      onPress={async (event) => {
        if (onPress) {
          onPress(event); // Call the parent-provided onPress if available
        }

        // Open in-app browser for native platforms
        if (Platform.OS !== "web") {
          event.preventDefault?.(); // Prevent default navigation
          await openBrowserAsync(href);
        }
      }}
    />
  );
}
