user_input = input('Are you a furry? (Yes/No) ')

try:
    if user_input.lower() == "yes":
        print('meowwwww')
    elif user_input.lower() == 'no':
        print('Good for you!')
    else:
        raise ValueError('WRONG')
except ValueError as e:
    print(e)

print("PLEASEEEEEEEE")

emma = ""
if emma == 'furry':
    print('jo is happy')