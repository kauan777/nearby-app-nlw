import {
  ActivityIndicator,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { NearbyText } from "./text";
import { TextProps } from "react-native-svg";
import { colors } from "@/styles/colors";
import { IconProps as TablerIconProps } from "@tabler/icons-react-native";

interface ButtonProps extends TouchableOpacityProps {
  isLoading?: boolean;
}

function Button({
  className,
  children,
  isLoading = false,
  disabled,
  ...props
}: Readonly<ButtonProps>) {
  return (
    <TouchableOpacity
      className={`h-14 max-h-14 bg-green-base rounded-[10px] items-center justify-center flex-row gap-[14px] ${className}`}
      activeOpacity={0.8}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator size={"small"} color={colors.gray[100]} />
      ) : (
        children
      )}
    </TouchableOpacity>
  );
}

interface IconProps {
  icon: React.ComponentType<TablerIconProps>;
}

function Icon({ icon: Icon }: Readonly<IconProps>) {
  return <Icon size={24} color={colors.gray[100]} />;
}

function Title({ children }: Readonly<TextProps>) {
  return (
    <NearbyText className="text-base font-semibold text-gray-100">
      {children}
    </NearbyText>
  );
}

Button.Icon = Icon;
Button.Title = Title;

export { Button };
