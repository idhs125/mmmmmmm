import { Member, MemberRole } from "@/lib/data/schema";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MinecraftCard } from "./MinecraftCard";
import { cn } from "@/lib/utils";

interface MemberCardProps {
  member: Member;
  className?: string;
}

export function MemberCard({ member, className }: MemberCardProps) {
  const roleColors = {
    [MemberRole.OWNER]: "bg-yellow-500 text-white",
    [MemberRole.LEADER]: "bg-purple-600 text-white",
    [MemberRole.MEMBER]: "bg-blue-500 text-white"
  };

  const roleNames = {
    [MemberRole.OWNER]: "Owner",
    [MemberRole.LEADER]: "Leader",
    [MemberRole.MEMBER]: "Member"
  };

  // Format date to readable format
  const formattedDate = new Date(member.joinedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });

  return (
    <MinecraftCard
      className={cn("h-full", className)}
      variant="secondary"
      header={
        <div className="flex items-center justify-between">
          <span className="text-xl">{member.name}</span>
          <span className={cn(
            "px-2 py-1 rounded text-xs font-medium",
            roleColors[member.role]
          )}>
            {roleNames[member.role]}
          </span>
        </div>
      }
      footer={
        <div className="w-full flex items-center justify-between text-sm text-gray-400">
          <span>Joined: {formattedDate}</span>
          {member.discordUsername && (
            <span>{member.discordUsername}</span>
          )}
        </div>
      }
    >
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <Avatar className="w-20 h-20 border-2 border-gray-700">
          <AvatarImage src={member.profileImage} alt={member.name} />
          <AvatarFallback className="bg-green-800 text-white">
            {member.name.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 text-center md:text-left">
          {member.description && (
            <p className="text-gray-300">{member.description}</p>
          )}
        </div>
      </div>
    </MinecraftCard>
  );
}
