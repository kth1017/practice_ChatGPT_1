package fadet;

import java.util.Random;

    public class DrawLots {
         public static void main(String[] args) {
            // Create an array to store the names of the participants
            String[] names = {"John", "Mary", "Jane", "Adam"};
            // Create a random object to generate a random number
            Random random = new Random();
             // Generate a random number between 0 and the length of the names array
            int index = random.nextInt(names.length);
            // Print out the name of the winner
            System.out.println("The winner is: " + names[index]);
        }
    }
