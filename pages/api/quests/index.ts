import { Quest, RawQuest, RawQuestErr } from '@/types/quests';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Quest[] | string>): Promise<void> {
	try {
		// Save the data to the collection
		const getRes: RawQuest[] | RawQuestErr = await fetch(`https://dummyjson.com/products?offset=0&limit=10`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((response) => response.json())
			.then((data) => data.products);

		if ((getRes as RawQuestErr).code) {
			throw new Error('An error occurred while fetching the data');
		}

		const formattedToQuests: Quest[] = (getRes as RawQuest[]).map((quest: RawQuest) => {
			return {
				id: quest.id,
				skillTree: quest.category.replace('-', ' '), // 'home-decoration' => 'home decoration'
				skill: quest.brand,
				title: quest.title,
				difficulty: Math.floor(quest.rating),
				experience: quest.stock * 100,
				gold: quest.price,
				type: '-',
				cover: quest.thumbnail
			};
		});

		// Send a response back to the client
		res.status(200).json(formattedToQuests);
	} catch (error) {
		// If the request fails, an error will be thrown
		console.error(error);

		// Send an error response back to the client
		res.status(500).json('An error occurred while fetching the data');
	}
}
