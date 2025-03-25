export enum MemberRole {
  OWNER = "OWNER",
  LEADER = "LEADER",
  MEMBER = "MEMBER"
}

export enum ServerPlatform {
  JAVA = "Java",
  BEDROCK = "Bedrock",
  POCKET = "Pocket",
  WINDOWS = "Windows"
}

export interface Member {
  id: string;
  name: string;
  minecraftUsername: string;
  discordUsername: string;
  role: MemberRole;
  joinedAt: Date;
  profileImage: string;
}

export interface Rule {
  id: string;
  title: string;
  description: string;
  category: string;
  important: boolean;
}

export interface ServerStatus {
  isOnline: boolean;
  playerCount: number;
  maxPlayers: number;
  lastUpdated: string;
  supportedPlatforms: string[];
  version: string;
  description: string;
}
