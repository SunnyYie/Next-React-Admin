import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  User: defineTable({
    id: v.string(),
    name: v.string(),
    createdAt: v.string(),
    email: v.string(),
  }),
})
