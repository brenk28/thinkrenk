import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/data/blog' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
		tags: z.array(z.string()).default([]),
		draft: z.boolean().default(false),
	}),
});

const projects = defineCollection({
	loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/data/projects' }),
	schema: z.object({
		title: z.string(),
		tagline: z.string(),
		order: z.number().default(99),
		status: z.enum(['in-progress', 'shipped', 'prototype', 'archived']).default('in-progress'),
		tech: z.array(z.string()).default([]),
		repo: z.string().url().optional(),
		liveUrl: z.string().url().optional(),
		heroImage: z.string(),
		gallery: z.array(z.object({
			src: z.string(),
			alt: z.string(),
		})).default([]),
	}),
});

export const collections = { blog, projects };
