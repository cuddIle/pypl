import { type Device, DeviceType } from "@/common/schemas/devices/device";
import { type IconType } from "react-icons";
import { FaQuestion } from "react-icons/fa6";
import { GiTv } from "react-icons/gi";
import { MdPhoneIphone } from "react-icons/md";

export default function DeviceIcon({
  device,
  size,
  onMouseEnter,
  onMouseLeave,
}: {
  device: Device;
  size?: number;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  const deviceTypeToIcon: Record<DeviceType, IconType> = {
    [DeviceType.PHONE]: MdPhoneIphone,
    [DeviceType.TV]: GiTv,
  };

  const IconComponent = device
    ? deviceTypeToIcon[device.type as DeviceType] || FaQuestion
    : FaQuestion;

  return <IconComponent size={size} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} />;
}
