class Api::V1::Admin::ApplicationsController < Api::V1::ApiController
  before_action :authorize!

  def index
      render json: {
                      status: 200,
                      body: { Authorized:  current_requester.admin? }
                   }
  end

  private

    def authorize!
      render json: { status: 401 } unless current_requester.admin?

      rescue JWT::DecodeError => e
        render json: { status: 401, error: e.message }
    end
end