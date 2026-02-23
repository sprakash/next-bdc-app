"use client";

import DataError from "@/app/components/DataError";

export default function FilmmakersError() {
  return (
    <DataError
      title="We’re having trouble fetching filmmakers."
    />
  );
}