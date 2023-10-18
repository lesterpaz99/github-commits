import { AuthorI } from "./author.interface";
import { GithubAuthorI } from "./github-author.interface";

export interface CommitI {
  author:        AuthorI;
  committer:     AuthorI;
  message:       string;
  tree:          TreeI;
  url:           string;
  comment_count: number;
  verification:  VerificationI;
}


/* Rest of github info, mabe i won't need it */
export interface GithubInfoI {
  sha:          string;
  node_id:      string;
  commit:       CommitI;
  url:          string;
  html_url:     string;
  comments_url: string;
  author:       GithubAuthorI;
  committer:    GithubAuthorI;
  parents:      ParentI[];
}

export interface TreeI {
  sha: string;
  url: string;
}

export interface VerificationI {
  verified:  boolean;
  reason:    string;
  signature: null;
  payload:   null;
}

export interface ParentI {
  sha:      string;
  url:      string;
  html_url: string;
}