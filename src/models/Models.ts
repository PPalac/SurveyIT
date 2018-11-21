type SurveyModel = {
        Id: number,
        Name: string,
        Start_date: Date,
        End_Date: Date,
        GroupId: Array<string>,
        Questions: Array<QuestionModel>
};

type QuestionModel = {
       Id: number,
       Content: string,
       SurveyId: Array<string>,
       Answers: Array<AnswerModel>,
       QuestionType: number
};

type AnswerModel = {
        Id: number,
        Content: string
}

type GroupModel = {
        Id: number,
        Name: string,
        UserId: Array<string>
}

type UserModel = {
        Id: number,
        FirstName: string,
        LastName: string,
        Username: string,
        Password: string,
        Email: string
}
