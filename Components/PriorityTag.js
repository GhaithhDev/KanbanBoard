import { Tag } from "./Tag";
import { Priority } from "../Enums/priority";

export function PriorityTag(props) {
  const priorityColors = {
    [Priority.LOW]: {
      textColor: "#1f7a1f",
      backgroundColor: "#6bff8a40",
      borderColor: "#28a745",
    },
    [Priority.NORMAL]: {
      textColor: "#0b5ed7",
      backgroundColor: "#6ba8ff40",
      borderColor: "#3d8bfd",
    },
    [Priority.HIGH]: {
      textColor: "#930606",
      backgroundColor: "#ff6b6b93",
      borderColor: "#ea1111",
    },
    [Priority.CRITICAL]: {
      textColor: "#5a0b7a",
      backgroundColor: "#d96bff40",
      borderColor: "#a020f0",
    },
  };
  return (
    <Tag
      textColor={priorityColors[props.priority].textColor}
      backgroundColor={priorityColors[props.priority].backgroundColor}
      borderColor={priorityColors[props.priority].borderColor}
      text={props.priority}
    ></Tag>
  );
}
