import { useEffect, useState } from 'react';
import { GithubInfoI } from '../../types/commit.interface';
import { Commit } from '../commit';
import { commitsService } from '../../services/getCommits';
import { Pagination, usePagination } from 'pagination-react-js';

// mock data for github commits
// const commits: GithubInfoI[] = [
// 	{
// 		sha: '3e9d334f1dd3f812bd24fd044085b3923c56a392',
// 		node_id:
// 			'C_kwDOKKxu4doAKDNlOWQzMzRmMWRkM2Y4MTJiZDI0ZmQwNDQwODViMzkyM2M1NmEzOTI',
// 		commit: {
// 			author: {
// 				name: 'Obed Paz',
// 				email: 'lesterpaz99@gmail.com',
// 				date: '2023-10-15T05:54:46Z',
// 			},
// 			committer: {
// 				name: 'Obed Paz',
// 				email: 'lesterpaz99@gmail.com',
// 				date: '2023-10-15T05:54:46Z',
// 			},
// 			message: 'fix error importing styles in display component',
// 			tree: {
// 				sha: '1c5636ed45c9626706ded708cc179a59fec0d4a9',
// 				url: 'https://api.github.com/repos/lesterpaz99/FCC-calculator/git/trees/1c5636ed45c9626706ded708cc179a59fec0d4a9',
// 			},
// 			url: 'https://api.github.com/repos/lesterpaz99/FCC-calculator/git/commits/3e9d334f1dd3f812bd24fd044085b3923c56a392',
// 			comment_count: 0,
// 			verification: {
// 				verified: false,
// 				reason: 'unsigned',
// 				signature: null,
// 				payload: null,
// 			},
// 		},
// 		url: 'https://api.github.com/repos/lesterpaz99/FCC-calculator/commits/3e9d334f1dd3f812bd24fd044085b3923c56a392',
// 		html_url:
// 			'https://github.com/lesterpaz99/FCC-calculator/commit/3e9d334f1dd3f812bd24fd044085b3923c56a392',
// 		comments_url:
// 			'https://api.github.com/repos/lesterpaz99/FCC-calculator/commits/3e9d334f1dd3f812bd24fd044085b3923c56a392/comments',
// 		author: {
// 			login: 'lesterpaz99',
// 			id: 62860279,
// 			node_id: 'MDQ6VXNlcjYyODYwMjc5',
// 			avatar_url: 'https://avatars.githubusercontent.com/u/62860279?v=4',
// 			gravatar_id: '',
// 			url: 'https://api.github.com/users/lesterpaz99',
// 			html_url: 'https://github.com/lesterpaz99',
// 			followers_url: 'https://api.github.com/users/lesterpaz99/followers',
// 			following_url:
// 				'https://api.github.com/users/lesterpaz99/following{/other_user}',
// 			gists_url: 'https://api.github.com/users/lesterpaz99/gists{/gist_id}',
// 			starred_url:
// 				'https://api.github.com/users/lesterpaz99/starred{/owner}{/repo}',
// 			subscriptions_url:
// 				'https://api.github.com/users/lesterpaz99/subscriptions',
// 			organizations_url: 'https://api.github.com/users/lesterpaz99/orgs',
// 			repos_url: 'https://api.github.com/users/lesterpaz99/repos',
// 			events_url: 'https://api.github.com/users/lesterpaz99/events{/privacy}',
// 			received_events_url:
// 				'https://api.github.com/users/lesterpaz99/received_events',
// 			type: 'User',
// 			site_admin: false,
// 		},
// 		committer: {
// 			login: 'lesterpaz99',
// 			id: 62860279,
// 			node_id: 'MDQ6VXNlcjYyODYwMjc5',
// 			avatar_url: 'https://avatars.githubusercontent.com/u/62860279?v=4',
// 			gravatar_id: '',
// 			url: 'https://api.github.com/users/lesterpaz99',
// 			html_url: 'https://github.com/lesterpaz99',
// 			followers_url: 'https://api.github.com/users/lesterpaz99/followers',
// 			following_url:
// 				'https://api.github.com/users/lesterpaz99/following{/other_user}',
// 			gists_url: 'https://api.github.com/users/lesterpaz99/gists{/gist_id}',
// 			starred_url:
// 				'https://api.github.com/users/lesterpaz99/starred{/owner}{/repo}',
// 			subscriptions_url:
// 				'https://api.github.com/users/lesterpaz99/subscriptions',
// 			organizations_url: 'https://api.github.com/users/lesterpaz99/orgs',
// 			repos_url: 'https://api.github.com/users/lesterpaz99/repos',
// 			events_url: 'https://api.github.com/users/lesterpaz99/events{/privacy}',
// 			received_events_url:
// 				'https://api.github.com/users/lesterpaz99/received_events',
// 			type: 'User',
// 			site_admin: false,
// 		},
// 		parents: [
// 			{
// 				sha: '6ecfe4a546b124eeaf8762d58467e0ce43f6090c',
// 				url: 'https://api.github.com/repos/lesterpaz99/FCC-calculator/commits/6ecfe4a546b124eeaf8762d58467e0ce43f6090c',
// 				html_url:
// 					'https://github.com/lesterpaz99/FCC-calculator/commit/6ecfe4a546b124eeaf8762d58467e0ce43f6090c',
// 			},
// 		],
// 	},
// 	{
// 		sha: '6ecfe4a546b124eeaf8762d58467e0ce43f6090c',
// 		node_id:
// 			'C_kwDOKKxu4doAKDZlY2ZlNGE1NDZiMTI0ZWVhZjg3NjJkNTg0NjdlMGNlNDNmNjA5MGM',
// 		commit: {
// 			author: {
// 				name: 'Obed Paz',
// 				email: 'lesterpaz99@gmail.com',
// 				date: '2023-10-15T05:50:29Z',
// 			},
// 			committer: {
// 				name: 'Obed Paz',
// 				email: 'lesterpaz99@gmail.com',
// 				date: '2023-10-15T05:50:29Z',
// 			},
// 			message: 'update validations',
// 			tree: {
// 				sha: '396c63fb188e76066555d33361152d68e9115569',
// 				url: 'https://api.github.com/repos/lesterpaz99/FCC-calculator/git/trees/396c63fb188e76066555d33361152d68e9115569',
// 			},
// 			url: 'https://api.github.com/repos/lesterpaz99/FCC-calculator/git/commits/6ecfe4a546b124eeaf8762d58467e0ce43f6090c',
// 			comment_count: 0,
// 			verification: {
// 				verified: false,
// 				reason: 'unsigned',
// 				signature: null,
// 				payload: null,
// 			},
// 		},
// 		url: 'https://api.github.com/repos/lesterpaz99/FCC-calculator/commits/6ecfe4a546b124eeaf8762d58467e0ce43f6090c',
// 		html_url:
// 			'https://github.com/lesterpaz99/FCC-calculator/commit/6ecfe4a546b124eeaf8762d58467e0ce43f6090c',
// 		comments_url:
// 			'https://api.github.com/repos/lesterpaz99/FCC-calculator/commits/6ecfe4a546b124eeaf8762d58467e0ce43f6090c/comments',
// 		author: {
// 			login: 'lesterpaz99',
// 			id: 62860279,
// 			node_id: 'MDQ6VXNlcjYyODYwMjc5',
// 			avatar_url: 'https://avatars.githubusercontent.com/u/62860279?v=4',
// 			gravatar_id: '',
// 			url: 'https://api.github.com/users/lesterpaz99',
// 			html_url: 'https://github.com/lesterpaz99',
// 			followers_url: 'https://api.github.com/users/lesterpaz99/followers',
// 			following_url:
// 				'https://api.github.com/users/lesterpaz99/following{/other_user}',
// 			gists_url: 'https://api.github.com/users/lesterpaz99/gists{/gist_id}',
// 			starred_url:
// 				'https://api.github.com/users/lesterpaz99/starred{/owner}{/repo}',
// 			subscriptions_url:
// 				'https://api.github.com/users/lesterpaz99/subscriptions',
// 			organizations_url: 'https://api.github.com/users/lesterpaz99/orgs',
// 			repos_url: 'https://api.github.com/users/lesterpaz99/repos',
// 			events_url: 'https://api.github.com/users/lesterpaz99/events{/privacy}',
// 			received_events_url:
// 				'https://api.github.com/users/lesterpaz99/received_events',
// 			type: 'User',
// 			site_admin: false,
// 		},
// 		committer: {
// 			login: 'lesterpaz99',
// 			id: 62860279,
// 			node_id: 'MDQ6VXNlcjYyODYwMjc5',
// 			avatar_url: 'https://avatars.githubusercontent.com/u/62860279?v=4',
// 			gravatar_id: '',
// 			url: 'https://api.github.com/users/lesterpaz99',
// 			html_url: 'https://github.com/lesterpaz99',
// 			followers_url: 'https://api.github.com/users/lesterpaz99/followers',
// 			following_url:
// 				'https://api.github.com/users/lesterpaz99/following{/other_user}',
// 			gists_url: 'https://api.github.com/users/lesterpaz99/gists{/gist_id}',
// 			starred_url:
// 				'https://api.github.com/users/lesterpaz99/starred{/owner}{/repo}',
// 			subscriptions_url:
// 				'https://api.github.com/users/lesterpaz99/subscriptions',
// 			organizations_url: 'https://api.github.com/users/lesterpaz99/orgs',
// 			repos_url: 'https://api.github.com/users/lesterpaz99/repos',
// 			events_url: 'https://api.github.com/users/lesterpaz99/events{/privacy}',
// 			received_events_url:
// 				'https://api.github.com/users/lesterpaz99/received_events',
// 			type: 'User',
// 			site_admin: false,
// 		},
// 		parents: [
// 			{
// 				sha: '26f82f4009c2f52b53e3c82eee4bcef4cbd648cc',
// 				url: 'https://api.github.com/repos/lesterpaz99/FCC-calculator/commits/26f82f4009c2f52b53e3c82eee4bcef4cbd648cc',
// 				html_url:
// 					'https://github.com/lesterpaz99/FCC-calculator/commit/26f82f4009c2f52b53e3c82eee4bcef4cbd648cc',
// 			},
// 		],
// 	},
// ];

export const CommitList = () => {
	const [dataCommits, setDataCommits] = useState<GithubInfoI[]>([]);
	const { currentPage, entries, entriesPerPage } = usePagination(1, 3);
	const baseUrl = import.meta.env.VITE_BASE_API_URL;
	const url = `${baseUrl}/lesterpaz99/FCC-calculator/commits`;

	useEffect(() => {
		commitsService.getCommits({ url }).then((response) => {
			setDataCommits(response?.data);
		});
	}, []);

	return (
		<>
			<ul>
				{dataCommits
					.slice(entries.indexOfFirst, entries.indexOfLast)
					.map((commit) => (
						<li key={commit.sha}>
							<Commit commit={commit.commit} author={commit.author} />
						</li>
					))}
			</ul>
			<Pagination
				entriesPerPage={entriesPerPage.get}
				totalEntries={dataCommits.length}
				currentPage={{ get: currentPage.get, set: currentPage.set }}
				offset={3}
				classNames={{
					wrapper: 'pagination m-auto',
					item: 'pagination-item',
					itemActive: 'pagination-item-active',
					navPrev: 'pagination-item nav-item',
					navNext: 'pagination-item nav-item',
					navStart: 'pagination-item nav-item',
					navEnd: 'pagination-item nav-item',
					navPrevCustom: 'pagination-item',
					navNextCustom: 'pagination-item',
				}}
				showFirstNumberAlways={true}
				showLastNumberAlways={true}
				navStart='&#171;'
				navEnd='&#187;'
				navPrev='&#x2039;'
				navNext='&#x203a;'
				navPrevCustom={{ steps: 5, content: '\u00B7\u00B7\u00B7' }}
				navNextCustom={{ steps: 5, content: '\u00B7\u00B7\u00B7' }}
			/>
		</>
	);
};
