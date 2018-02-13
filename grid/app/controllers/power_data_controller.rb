class PowerDataController < ApplicationController

    def index

        @data = File.read("/Users/jesseskeets/Desktop/crash/power/grid/app/assets/config/AviationData.json")
        render json: @data
    end

end
