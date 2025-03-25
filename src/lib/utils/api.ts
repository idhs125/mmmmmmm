import { members, rules, serverStatus, socialLinks } from "../data/mockData";
import { Member, MemberRole, MemberRoleType, Rule, ServerStatus } from "../data/schema";

// Members API Utilities
export function getAllMembers(): Member[] {
  return members;
}

export function getMemberById(id: string): Member | undefined {
  return members.find(member => member.id === id);
}

export function getMembersByRole(role: MemberRoleType): Member[] {
  return members.filter(member => member.role === role);
}

export function getOwner(): Member | undefined {
  return members.find(member => member.role === MemberRole.OWNER);
}

export function getLeaders(): Member[] {
  return members.filter(member => member.role === MemberRole.LEADER);
}

export function getRegularMembers(): Member[] {
  return members.filter(member => member.role === MemberRole.MEMBER);
}

// Rules API Utilities
export function getAllRules(): Rule[] {
  return rules;
}

export function getRuleById(id: string): Rule | undefined {
  return rules.find(rule => rule.id === id);
}

export function getRulesByCategory(category: string): Rule[] {
  return rules.filter(rule => rule.category === category);
}

export function getImportantRules(): Rule[] {
  return rules.filter(rule => rule.important);
}

// Server Status API
export function getServerStatus(): ServerStatus {
  return serverStatus;
}

export function updateServerStatus(newStatus: Partial<ServerStatus>): ServerStatus {
  Object.assign(serverStatus, { ...newStatus, lastUpdated: new Date() });
  return serverStatus;
}

// Social Links
export function getSocialLinks() {
  return socialLinks;
}
