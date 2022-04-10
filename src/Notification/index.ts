import { notification } from "antd"
import { NotificationPlacement } from "antd/lib/notification"

export const openNotification = (
  placement: NotificationPlacement,
  description: string
) => {
  notification.info({
    message: "Atencion",
    description,
    placement
  })
}
