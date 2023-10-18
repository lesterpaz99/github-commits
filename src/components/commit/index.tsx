import { CommitI } from '../../types/commit.interface';
import { GithubAuthorI } from '../../types/github-author.interface';
import formatDistance from 'date-fns/formatDistance';

interface CommitPropsI {
	commit: CommitI;
	author: GithubAuthorI;
}

export const Commit = ({ commit, author }: CommitPropsI) => {
	const formattedDate = formatDistance(
		new Date(commit.committer.date),
		new Date(),
		{ addSuffix: true }
	);

	return (
		<div>
			<h3>{commit.message}</h3>
			<p>{formattedDate}</p>
			<img src={author.avatar_url} alt={commit.author.name} />
		</div>
	);
};
