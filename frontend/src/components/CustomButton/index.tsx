import { LoadingButton, LoadingButtonProps } from "@mui/lab";
import { MouseEventHandler, ReactElement } from "react";
import { SxProps } from "@mui/material";
import { colors } from "../../constants";

export type ButtonProps = LoadingButtonProps & {
  styles?: SxProps;
  buttonText?: string;
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  dataTestId?: string;
};

const Button = ({
  styles,
  buttonText,
  disabled = false,
  isLoading = false,
  onClick = () => {},
  startIcon,
  endIcon,
  dataTestId = "SubmitBtn",
  variant,
  ...props
}: ButtonProps) => (
  <LoadingButton
    type="submit"
    loading={isLoading}
    disabled={disabled}
    onClick={onClick}
    variant={"contained"}
    startIcon={startIcon}
    endIcon={endIcon}
    data-testid={dataTestId}
    sx={{
      ...{
        borderRadius: 1,
        textTransform: "none",
        p: endIcon
          ? "10px 16px 10px 24px"
          : startIcon
          ? "10px 24px 10px 16px"
          : "10px 24px",
        boxShadow: "none",
        bgcolor: variant === "outlined" ? colors.white : colors.brown,
        color: variant === "outlined" ? colors.black : colors.white,
        border: `1px solid ${colors.black}`,
        "&:hover": {
          bgcolor:
            variant === "outlined" ? colors.lightGrey : colors.lightBrown,
          boxShadow: "none",
        },
        "&:disabled": {
          bgcolor: colors.lightGrey,
          color: isLoading ? colors.charcoal : colors.contentSecondary,
          opacity: 0.6,
        },
      },
      ...(styles && { ...styles }),
    }}
    {...props}
  >
    {buttonText}
  </LoadingButton>
);

export default Button;
