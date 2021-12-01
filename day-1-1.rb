file = File.open("./inputs/day-1.txt")
file_data = file.readlines.map(&:chomp)
file.close()
increases = 0
lastValue = 0
file_data.each do |number|
    if number.to_i > lastValue and lastValue > 0
        increases += 1 
    end 

    lastValue = number.to_i;
end

print increases
