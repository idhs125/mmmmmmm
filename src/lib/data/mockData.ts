import { Member, MemberRole, Rule, ServerStatus } from "./schema";

export const members: Member[] = [
  {
    id: "0",
    name: "Shaitaan",
    minecraftUsername: "Lord_Shaitaan",
    discordUsername: "private",
    role: MemberRole.OWNER,
    joinedAt: new Date("2025-03-25"),
    profileImage: "https://mc-heads.net/avatar/Lord_Shaitaan",
  },
  {
    id: "1",
    name: "Uday",
    minecraftUsername: "Deathlord",
    discordUsername: "ogdeathlord",
    role: MemberRole.LEADER,
    joinedAt: new Date("2025-03-25"),
    profileImage: "https://mc-heads.net/avatar/Deathlord",
  },
  {
    id: "2", 
    name: "Abhinav",
    minecraftUsername: "LordHitler",
    discordUsername: "abhi20092011",
    role: MemberRole.MEMBER,
    joinedAt: new Date("2025-03-25"),
    profileImage: "https://mc-heads.net/avatar/LordHitler",
  },
  {
    id: "3",
    name: "Moksh",
    minecraftUsername: "ShadowFuryLord",
    discordUsername: "_ghost_rider1234_69906",
    role: MemberRole.MEMBER,
    joinedAt: new Date("2025-03-25"),
    profileImage: "https://mc-heads.net/avatar/ShadowFuryLord",
  },
  {
    id: "4",
    name: "Sumirav",
    minecraftUsername: "Varimus_Lord",
    discordUsername: "varimus._02544",
    role: MemberRole.MEMBER,
    joinedAt: new Date("2025-03-25"),
    profileImage: "https://mc-heads.net/avatar/Varimus_Lord",
  },
  {
    id: "5",
    name: "Danish",
    minecraftUsername: "LordDanapani",
    discordUsername: "beastboy0149",
    role: MemberRole.MEMBER,
    joinedAt: new Date("2025-03-25"),
    profileImage: "https://mc-heads.net/avatar/LordDanapani",
  },
  {
    id: "6",
    name: "Deepaj",
    minecraftUsername: "DeepuLord",
    discordUsername: "deepajkc",
    role: MemberRole.MEMBER,
    joinedAt: new Date("2025-03-25"),
    profileImage: "https://mc-heads.net/avatar/DeepuLord",
  },
  {
    id: "7",
    name: "Aaryan Dev",
    minecraftUsername: "Lord_Necron",
    discordUsername: "editor.here",
    role: MemberRole.MEMBER,
    joinedAt: new Date("2025-03-25"),
    profileImage: "https://mc-heads.net/avatar/Lord_Necron",
  },
  {
    id: "8",
    name: "Aarav Sethi",
    minecraftUsername: "CreaperLord23",
    discordUsername: "lucy_09837",
    role: MemberRole.MEMBER,
    joinedAt: new Date("2025-03-25"),
    profileImage: "https://mc-heads.net/avatar/CreaperLord23",
  },
  {
    id: "9",
    name: "Neer Matta",
    minecraftUsername: "NeerCobra",
    discordUsername: "neercobra",
    role: MemberRole.MEMBER,
    joinedAt: new Date("2025-03-25"),
    profileImage: "https://mc-heads.net/avatar/NeerCobra",
  },
  {
    id: "10",
    name: "Abhijay",
    minecraftUsername: "CURSED_LORD_KIRITO",
    discordUsername: "asr_gamerz",
    role: MemberRole.MEMBER,
    joinedAt: new Date("2025-03-25"),
    profileImage: "https://mc-heads.net/avatar/CURSED_LORD_KIRITO",
  },
  {
    id: "11",
    name: "Aadhya",
    minecraftUsername: "Lord_Aadhya",
    discordUsername: "aadhya_29",
    role: MemberRole.MEMBER,
    joinedAt: new Date("2025-03-25"),
    profileImage: "https://mc-heads.net/avatar/Lord_Aadhya",
  }
];

export const rules: Rule[] = [
  {
    id: "1",
    title: "Complete Freedom",
    description: "No rules at all – Full freedom, but a leader will make final decisions when needed.",
    category: "General",
    important: true
  },
  {
    id: "2",
    title: "Leader Authority",
    description: "A leader will have authority over major decisions.",
    category: "Leadership",
    important: true
  },
  {
    id: "3",
    title: "Following Instructions",
    description: "The leader's instructions must be followed, though you can request changes.",
    category: "Leadership",
    important: true
  }
];

export const serverStatus: ServerStatus = {
  isOnline: true,
  playerCount: 0,
  maxPlayers: 30,
  lastUpdated: "2025-03-25T15:30:41Z",
  supportedPlatforms: ["Java", "Bedrock"],
  version: "1.20.1",
  description: "Lords SMP Server"
};

export const socialLinks = {
  discord: "https://discord.gg/lordsmp",
  instagram: "https://instagram.com/lordsmp"
};
