// CSV Parser

import Papa from "papaparse";
import { parseEther } from "viem";
import type { AllowlistEntry } from "./merkle";

export function parseAllowlistCSV(csvText: string):AllowlistEntry[]{
    const result = Papa.parse(csvText.trim(),{
        header: true,
        skipEmptyLines:true,
    });

    return (result.data as Record<string, string>[])
        .filter((row)=>row.address && row.amount)
        .map((row)=>({
            address:row.address.trim(),
            amount:parseEther(row.amount.trim()),
        }));
}