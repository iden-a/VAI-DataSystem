from datetime import datetime, timezone

# user class
class UserSignUp:
    def __init__(self, first_name, last_name, email, password):
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.password = password # this is not going to be stored in the DB, we just need it to create the user

    def to_dict(self, uid):
        return {
            "uid": uid, #user id
            "firstName": self.first_name,
            "lastName": self.last_name,
            "email": self.email,
        }

# survey response class
class SurveyResponse:
    def __init__(self, responses, installation_id):
        self.responses = responses # {}
        self.installation_id = installation_id # installation #1
        self.submitted_at = datetime.now(timezone.utc).isoformat() # time of submission

    def to_dict(self):
        return {
            "installationId" : self.installation_id,
            "responses" : self.responses,
            "submittedAt" : self.submitted_at
        }
    
class DownloadSurveyData: # formatting the survey responses for download
    def __init__(self, allResponses):
        self.allResponses = allResponses
        pass
