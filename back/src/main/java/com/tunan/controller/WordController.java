package com.tunan.controller;

import com.tunan.domain.Word;
import com.tunan.service.WordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "*",maxAge = 3600)
public class WordController {

    @Autowired
    private WordService wordService;

    @RequestMapping("/getWord")
    public Word getWord(int id){
        return wordService.getWord(id);
    }

    @RequestMapping("/getWordByWord")
    public Word getWordByWord(String word){
        return wordService.getWordByWord(word);
    }

    @RequestMapping("/getWords")
    public List<Word> getWords(Integer start, Integer num){
        return wordService.getWords(start,num);
    }

    @RequestMapping("/searchWords")
    public List<Word> searchWords(String key){
        return wordService.searchWords(key);
    }

    @RequestMapping("/mindWords")
    public List<Word> mindWords(String key){
        return wordService.searchWords(key);
    }

    @RequestMapping("/getWordsByCategory")
    public List<Word> getWordsByCategory(Integer category,Integer start,Integer num){
        return wordService.getWordsByCategory(category,start,num);
    }
}
