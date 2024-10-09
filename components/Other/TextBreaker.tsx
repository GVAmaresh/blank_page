export const WordBreakText = ({
  text,
  wordLimit = 15,
}: {
  text: string;
  wordLimit?: number;
}) => {
  const words = text.split("");

  const displayText =
    words.length > wordLimit
      ? words.slice(0, wordLimit).join("") + "..."
      : text;

  return <div className="">{displayText}</div>; 
};
