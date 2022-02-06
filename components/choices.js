import { Button } from "@nextui-org/react";

export default function Choices({ choices, onClick }) {
  return (
    <Button.Group size="xl" vertical color="gradient" ghost>
      {choices &&
        choices.map((choice) => (
          <Button key={choice.id} /*onClick={() => onClick(choice)}*/>
            {choice.text}
          </Button>
        ))}
    </Button.Group>
  );
}
