class Api::V1::ApiController < ActionController::API
  include ErrorHandler

    private

      def current_requester
        @current_requester ||= User.find(JwToken.decode(parse_request)["user_id"])
      end

      def parse_request
        request.env['HTTP_AUTHORIZATION'].match(/^Bearer (.*)/)[1]
      end
end