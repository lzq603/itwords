package com.tunan.service;

import com.tunan.domain.Word;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface WordService {
    public Word getWord(int id);
    public Word getWordByWord(String word);
    public List<Word> getWords(Integer start, Integer num);
    public List<Word> searchWords(String key);
    public List<Word> mindWords(String key);
    public List<Word> getWordsByCategory(@Param("category")Integer category, @Param("start") Integer start, @Param("num") Integer num);
}
