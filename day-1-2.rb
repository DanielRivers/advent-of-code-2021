file = File.open("./inputs/day-1.txt")
file_data = file.readlines.map(&:chomp)
file.close()

increases = 0
lastValue = 0
file_data.each_with_index do |number, index|
    sum = number.to_i +  file_data[index+1].to_i +  file_data[index +2].to_i
    if sum > lastValue and lastValue > 0
        increases += 1 
    end 

    lastValue = sum;
end

print increases