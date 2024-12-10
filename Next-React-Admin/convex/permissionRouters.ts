import { mutation, query } from './_generated/server'
import { v } from 'convex/values'

export const get = query({
  args: {},
  handler: async ctx => {
    return await ctx.db.query('permissionRouters').collect()
  },
})

export const create = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    const permissionRouters = await ctx.db
      .query('permissionRouters')
      .filter(q => q.eq(q.field('id'), args.id))
      .unique()
    if (permissionRouters) {
      return permissionRouters
    }
    return await ctx.db.insert('permissionRouters', args)
  },
})
