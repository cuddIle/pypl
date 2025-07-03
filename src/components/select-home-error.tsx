import { Center, Image, Stack, Text } from "@mantine/core";

export default function SelectHomeError() {
  return (
    <Center>
      <Stack>
        <Image
          mt={150}
          src="/homeless-image.png"
          width={300}
          height={240}
          alt="Home Not Selected"
          fit="contain"
        />
        <Text size="xs" ml={80} ta="center">
          Please select a home to continue.
        </Text>
      </Stack>
    </Center>
  );
}
