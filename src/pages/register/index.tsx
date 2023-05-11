import { AuthPage, ThemedTitleV2 } from "@refinedev/mantine";
import { AppIcon } from "~/components/app-icon";

export const Register = () => {
  return (
    <AuthPage
      type="register"
      title={
        <ThemedTitleV2
          collapsed={false}
          text="Vạn Phú Bình"
          icon={<AppIcon />}
        />
      }
    />
  );
};
