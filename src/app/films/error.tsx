"use client";

import DataError from "@/app/components/DataError";

export default function FilmsError() {
  return (
    <DataError
      title="We’re having trouble fetching the film catalog."
    />
  );
}