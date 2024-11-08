export default function formatDate(dateString: string | undefined) {
  if (!dateString) {
    return "";
  }
  const dateObject = new Date(dateString);

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(dateObject);

  return formattedDate;
}
