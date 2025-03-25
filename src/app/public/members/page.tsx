"use client";

import { useState } from "react";
import { MinecraftSection } from "@/components/minecraft/MinecraftSection";
import { MemberCard } from "@/components/minecraft/MemberCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAllMembers, getLeaders, getMembersByRole, getOwner, getRegularMembers } from "@/lib/utils/api";
import { Member, MemberRole } from "@/lib/data/schema";
import Link from "next/link";

export default function MembersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const allMembers = getAllMembers();
  const owner = getOwner();
  const leaders = getLeaders();
  const regularMembers = getRegularMembers();

  // Filter members by search term
  const filterMembers = (membersToFilter: Member[]) => {
    if (!searchTerm) return membersToFilter;
    return membersToFilter.filter(member =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (member.description && member.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  return (
    <div>
      <MinecraftSection
        title="Server Members"
        subtitle="Meet the amazing players that make up our community"
        backgroundImage="/images/castle-spawn.png"
        overlay={true}
        className="pt-32 pb-20"
      >
        {/* Search Input */}
        <div className="max-w-lg mx-auto mb-10">
          <div className="relative">
            <input
              type="text"
              placeholder="Search members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-zinc-800/90 text-white border-2 border-green-600/50 rounded-lg py-3 px-4 focus:outline-none focus:border-green-500"
            />
            <div className="absolute right-4 top-3.5 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-4 max-w-lg mx-auto mb-8">
            <TabsTrigger value="all" className="font-minecraft">All</TabsTrigger>
            <TabsTrigger value="owner" className="font-minecraft">Owner</TabsTrigger>
            <TabsTrigger value="leaders" className="font-minecraft">Leaders</TabsTrigger>
            <TabsTrigger value="members" className="font-minecraft">Members</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {filterMembers(allMembers).map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
              {filterMembers(allMembers).length === 0 && (
                <div className="col-span-3 text-center py-20">
                  <h3 className="text-xl font-minecraft text-gray-400">No members found</h3>
                  <p className="text-gray-500 mt-2">Try a different search term</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="owner">
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6 mt-6 max-w-2xl mx-auto">
              {owner && filterMembers([owner]).map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
              {(!owner || filterMembers([owner]).length === 0) && (
                <div className="text-center py-20">
                  <h3 className="text-xl font-minecraft text-gray-400">No owner found</h3>
                  <p className="text-gray-500 mt-2">Try a different search term</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="leaders">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {filterMembers(leaders).map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
              {filterMembers(leaders).length === 0 && (
                <div className="col-span-3 text-center py-20">
                  <h3 className="text-xl font-minecraft text-gray-400">No leaders found</h3>
                  <p className="text-gray-500 mt-2">Try a different search term</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="members">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {filterMembers(regularMembers).map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
              {filterMembers(regularMembers).length === 0 && (
                <div className="col-span-3 text-center py-20">
                  <h3 className="text-xl font-minecraft text-gray-400">No members found</h3>
                  <p className="text-gray-500 mt-2">Try a different search term</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </MinecraftSection>

      <MinecraftSection
        className="bg-zinc-900 py-16 text-center"
      >
        <h2 className="font-minecraft text-3xl mb-6">Want to Join Our Community?</h2>
        <p className="text-gray-300 mb-8 max-w-3xl mx-auto">
          Apply to become a member of the LordSMP server and join our growing community of creative builders and adventurers.
        </p>
        <a
          href="/public/join"
          className="minecraft-button"
        >
          Apply Now
        </a>
      </MinecraftSection>
    </div>
  );
}
