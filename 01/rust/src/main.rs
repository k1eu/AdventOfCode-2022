use std::fs::File;
use std::io::prelude::*;
use std::io::BufReader;

fn main() {
    let opened_file = File::open("input.txt").expect("file not found!");
    let read_file = BufReader::new(opened_file);

    let mut curr_elf: i32 = 0;
    let mut elves_calories_sum: Vec<i32> = Vec::new();

    for line in read_file.lines() {
        if let Ok(line) = line {
            if line == "" {
                elves_calories_sum.push(curr_elf);
                curr_elf = 0;
            } else {
                match line.parse::<i32>() {
                    Ok(x) => curr_elf += x,
                    _ => println!("Error"),
                }
            }
        }
    }

    if curr_elf != 0 {
        elves_calories_sum.push(curr_elf);
    }

    let highest_in_the_room = *elves_calories_sum.iter().max().unwrap();

    elves_calories_sum.sort();

    let three_best: i32 = elves_calories_sum.iter().rev().take(3).sum();

    println!("Highest: {}", highest_in_the_room);
    println!("Top Three Summed {}", three_best);
}
