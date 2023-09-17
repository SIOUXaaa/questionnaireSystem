export type QuestionData = {
    "colName": string,
    "content": string,
    "answer": string,
}

export type UserStatus = {
    id: string,
    level: string,
    role: string,
    stockSelection: string,
    shareInfo: string,
}

export type postData = {
    question_id: string,
    user_id: string,
    answer: string,
}
