"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  MoreHorizontal,
  Pencil,
  Trash2,
  Eye,
  Ban,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";

interface UserActionsProps {
  userId: string;
}

export function UserActions({ userId }: UserActionsProps) {
  const handleCopyId = () => {
    navigator.clipboard.writeText(userId);
    toast.success("User ID copied to clipboard");
  };

  const handleViewDetails = () => {
    toast.info("View details feature coming soon");
  };

  const handleEditUser = () => {
    toast.info("Edit user feature coming soon");
  };

  const handleChangeRole = () => {
    toast.info("Change role feature coming soon");
  };

  const handleBanUser = () => {
    toast.warning("Ban user feature coming soon");
  };

  const handleDeleteUser = () => {
    toast.error("Delete user feature coming soon");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem className="cursor-pointer" onClick={handleCopyId}>
          Copy user ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={handleViewDetails}
        >
          <Eye className="mr-2 h-4 w-4" />
          View details
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={handleEditUser}>
          <Pencil className="mr-2 h-4 w-4" />
          Edit user
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={handleChangeRole}>
          <ShieldCheck className="mr-2 h-4 w-4" />
          Change role
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={handleBanUser}>
          <Ban className="mr-2 h-4 w-4" />
          Ban user
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer text-destructive"
          onClick={handleDeleteUser}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete user
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
