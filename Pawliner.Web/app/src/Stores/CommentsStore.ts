import { observable } from 'mobx';

import CommentModel from '../Models/CommentModel';

class CommentsStore {
    @observable comments: CommentModel[] = [];
}

export const commentsStore = new CommentsStore();
