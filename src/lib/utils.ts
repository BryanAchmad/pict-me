import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import supabase from "./supabase/server";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getSupabaseImageUrl(path: string) {
  if (!path) return null;
  const trimmedPath = path.replace(/^profiles\//, '').trim();
  const { data } = supabase.storage.from('profiles').getPublicUrl(trimmedPath);
  return data.publicUrl;
}

