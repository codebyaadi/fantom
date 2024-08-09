import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Function to generate a random profile image URL
export const getRandomProfileImg = (): string => {
  const profileImgsNameList: string[] = [
    "Garfield",
    "Tinkerbell",
    "Annie",
    "Loki",
    "Cleo",
    "Angel",
    "Bob",
    "Mia",
    "Coco",
    "Gracie",
    "Bear",
    "Bella",
    "Abby",
    "Harley",
    "Cali",
    "Leo",
    "Luna",
    "Jack",
    "Felix",
    "Kiki",
  ];
  const profileImgsCollectionsList: string[] = [
    "notionists-neutral",
    "adventurer-neutral",
    "fun-emoji",
  ];
  const name: string =
    profileImgsNameList[Math.floor(Math.random() * profileImgsNameList.length)];
  const collection: string =
    profileImgsCollectionsList[
      Math.floor(Math.random() * profileImgsCollectionsList.length)
    ];
  return `https://api.dicebear.com/6.x/${collection}/svg?seed=${name}`;
};

export const sanatizeFileFolderName = (name: string) =>
  name.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase();
