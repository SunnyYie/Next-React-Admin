import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  User: defineTable({
    id: v.string(),
    name: v.string(),
    createdAt: v.string(),
    email: v.string(),
    role: v.string(),
  }),
  permissionRouters: defineTable({
    id: v.string(),
    path: v.string(),
    name: v.string(),
    icon: v.string(),
    parentId: v.string(),
    createdAt: v.string(),
    updatedAt: v.string(),
    children: v.array(v.string()),
    order: v.number(),
    role: v.string(),
  }).index('by_path', ['path']),
  role: defineTable({
    id: v.string(),
    name: v.string(),
    createdAt: v.string(),
    updatedAt: v.string(),
    permissionRouters: v.array(v.string()),
  }),
})
