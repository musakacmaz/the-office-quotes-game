import { Text } from "@nextui-org/react";

export default function Scoreboard({ score }) {
  return (
    <Text
      h1
      size={40}
      css={{
        textGradient: "45deg, $blue500 -20%, $pink500 50%",
        textShadow: "0px 0px 10px $blue500",
        margin: "10px",
      }}
      weight="bold"
    >
      Score: {score}
    </Text>
  );
}
