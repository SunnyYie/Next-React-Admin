import { mutation, query } from './_generated/server'
import { v } from 'convex/values'

export const get = query({
  args: {},
  handler: async ctx => {
    return await ctx.db.query('User').collect()
  },
})

export const create = mutation({
  args: { id: v.string(), name: v.string(), createdAt: v.string(), email: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db.query('User').filter(q => q.eq(q.field('id'), args.id)).unique()

    if (user) {
      return user
    }

    return await ctx.db.insert('User', args)
  },
})
