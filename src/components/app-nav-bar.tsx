"use client";

import { NavLink, Stack, Text } from "@mantine/core";
import { usePathname, useRouter } from "next/navigation";
import { FC } from "react";
import { type IconBaseProps } from "react-icons/lib";

interface Page {
  label: string;
  icon: FC<IconBaseProps>;
  link: string;
}

export default function AppNavbar({ pages }: { pages: Page[] }) {
  const pathname = usePathname().slice(1).toLowerCase();
  const router = useRouter();

  const items = pages.map((page) => (
    <NavLink
      href="#required-for-focus"
      key={page.label}
      active={pathname.startsWith(page.label.toLowerCase())}
      label={<Text size="xl">{page.label}</Text>}
      leftSection={<page.icon size={16} />}
      onClick={() => router.push(page.link)}
    />
  ));

  return <Stack>{items}</Stack>;
}
