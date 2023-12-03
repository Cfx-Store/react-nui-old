import { VisibilityProvider } from "@/context/visibility-context";

type Props = {
  children: React.ReactNode;
};

export function Providers({ children }: Props) {
  return <VisibilityProvider>{children}</VisibilityProvider>;
}
