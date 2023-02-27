import { Quest, RawQuest, RawQuestErr } from '@/types/quests';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Quest | string>) {
	try {
		// Fetch a product by id
		const questRes: RawQuest | RawQuestErr = await fetch(`https://dummyjson.com/products/${String(req.query.id)}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((response) => response.json());

		if ((questRes as RawQuestErr).code) {
			throw new Error('An error occurred while fetching the data');
		}

		const {
			id,
			title,
			brand: skill,
			rating,
			stock,
			price: gold,
			thumbnail: cover,
			category,
			description
		} = questRes as RawQuest

		const formattedToQuests = {
			id,
			skillTree: category.replace('-', ' '), // 'home-decoration' => 'home decoration'
			skill,
			title,
			difficulty: Math.floor(rating),
			experience: stock * 100,
			gold,
			type: '-',
			cover,
			description,
			rewards: {
				experience: stock * 100,
				gold
			}
		};

		// Send a response back to the client
		res.status(200).json(formattedToQuests);
	} catch (error) {
		// If the request fails, an error will be thrown
		console.error(error);

		// Send an error response back to the client
		res.status(500).json('An error occurred while fetching the data');
	}
}
