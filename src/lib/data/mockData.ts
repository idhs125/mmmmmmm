import { Member, MemberRole, Rule, ServerPlatform, ServerStatus } from "./schema";

// Mock Members
export const members: Member[] = [
  {
    id: "1",
    name: "LordKing",
    role: MemberRole.OWNER,
    joinedAt: new Date("2023-01-01"),
    profileImage: "https://mc-heads.net/avatar/LordKing",
    discordUsername: "lordking#1234",
    description: "Founder and owner of LordSMP. Building epic worlds since 2013."
  },
  {
    id: "2",
    name: "DragonSlayer",
    role: MemberRole.LEADER,
    joinedAt: new Date("2023-01-15"),
    profileImage: "https://mc-heads.net/avatar/DragonSlayer",
    discordUsername: "dragonslayer#5678",
    description: "Building coordinator and community manager. In charge of castle builds."
  },
  {
    id: "3",
    name: "RedstoneWizard",
    role: MemberRole.LEADER,
    joinedAt: new Date("2023-01-20"),
    profileImage: "https://mc-heads.net/avatar/RedstoneWizard",
    discordUsername: "redstonewiz#9012",
    description: "Redstone expert and technical advisor. Creates all the cool contraptions."
  },
  {
    id: "4",
    name: "MasterBuilder",
    role: MemberRole.MEMBER,
    joinedAt: new Date("2023-02-05"),
    profileImage: "https://mc-heads.net/avatar/MasterBuilder",
    discordUsername: "masterbuilder#3456",
    description: "Expert builder specializing in medieval architecture."
  },
  {
    id: "5",
    name: "PvPChampion",
    role: MemberRole.MEMBER,
    joinedAt: new Date("2023-02-10"),
    profileImage: "https://mc-heads.net/avatar/PvPChampion",
    discordUsername: "pvpchamp#7890",
    description: "Undefeated in server duels and events."
  },
  {
    id: "6",
    name: "ExplorerJane",
    role: MemberRole.MEMBER,
    joinedAt: new Date("2023-02-15"),
    profileImage: "https://mc-heads.net/avatar/ExplorerJane",
    discordUsername: "explorer_jane#2468",
    description: "Has mapped more of the world than anyone else."
  },
  {
    id: "7",
    name: "FarmingGuru",
    role: MemberRole.MEMBER,
    joinedAt: new Date("2023-03-01"),
    profileImage: "https://mc-heads.net/avatar/FarmingGuru",
    discordUsername: "farmingguru#1357",
    description: "Provides food and resources to the community."
  },
  {
    id: "8",
    name: "MiningMaster",
    role: MemberRole.MEMBER,
    joinedAt: new Date("2023-03-10"),
    profileImage: "https://mc-heads.net/avatar/MiningMaster",
    discordUsername: "miningmaster#2468",
    description: "Digs deeper than anyone else. Resource provider."
  }
];

// Mock Server Status
export const serverStatus: ServerStatus = {
  isOnline: true,
  version: "1.21.4",
  lastUpdated: new Date(),
  supportedPlatforms: [
    ServerPlatform.JAVA,
    ServerPlatform.BEDROCK,
    ServerPlatform.POCKET,
    ServerPlatform.WINDOWS
  ],
  playerCount: 12,
  maxPlayers: 30
};

// Mock Rules
export const rules: Rule[] = [
  {
    id: "1",
    title: "No Griefing",
    description: "Destroying or modifying another player's build without permission is strictly prohibited. This includes stealing items, breaking blocks, or vandalizing structures.",
    category: "Behavior",
    important: true
  },
  {
    id: "2",
    title: "Be Respectful",
    description: "Treat all players with respect. No harassment, discrimination, or offensive language in chat or voice communications.",
    category: "Behavior",
    important: true
  },
  {
    id: "3",
    title: "No Cheating or Hacking",
    description: "Use of any mods, hacks, or exploits that provide an unfair advantage is not allowed. This includes X-ray texture packs, fly hacks, speed hacks, etc.",
    category: "Technical",
    important: true
  },
  {
    id: "4",
    title: "Maintain Aesthetic Builds",
    description: "All builds should maintain a certain level of quality. No floating trees, dirt towers, or eyesores. Build with intention and care.",
    category: "Building",
    important: false
  },
  {
    id: "5",
    title: "Maintain Distance Between Bases",
    description: "Keep at least 200 blocks between major bases to respect others' space and prevent overcrowding.",
    category: "Building",
    important: false
  },
  {
    id: "6",
    title: "No Spamming or Excessive Lag",
    description: "Avoid creating lag-inducing mechanisms or farms. No redstone clocks without proper on/off switches. Server performance affects everyone.",
    category: "Technical",
    important: true
  },
  {
    id: "7",
    title: "Participate in Community Events",
    description: "Regular participation in community events is encouraged to foster a positive server environment.",
    category: "Community",
    important: false
  },
  {
    id: "8",
    title: "Report Issues Properly",
    description: "Report any bugs, glitches, or rule violations through the proper channels (Discord or server mail).",
    category: "Community",
    important: false
  },
  {
    id: "9",
    title: "No Claim Abandonment",
    description: "If you claim land but don't build on it within 14 days, your claim may be revoked.",
    category: "Building",
    important: false
  },
  {
    id: "10",
    title: "Discord Membership Required",
    description: "All players must join the Discord server for important announcements and community communication.",
    category: "Community",
    important: true
  }
];

// Social Links
export const socialLinks = {
  discord: "https://discord.gg/lordsmp",
  instagram: "https://instagram.com/lordsmp"
};
