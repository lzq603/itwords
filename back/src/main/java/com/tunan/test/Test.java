package com.tunan.test;
import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Test {
    public static void main(String[] args){
        try{
            System.out.println("start");
            String[] arg = new String[]{"C:\\Users\\Administrator\\AppData\\Local\\Programs\\Python\\Python37\\python.exe","D:\\IdeaProjects\\itwords\\src\\main\\java\\com\\tunan\\test\\test2.py","智能制造"};

            Process pr = Runtime.getRuntime().exec(arg);
            BufferedReader in = new BufferedReader(new InputStreamReader(pr.getInputStream()));
            String line;

            in.close();
            System.out.println(pr.waitFor());

            System.out.println("end");
        } catch (Exception e){
            e.printStackTrace();
        }
    }
} 